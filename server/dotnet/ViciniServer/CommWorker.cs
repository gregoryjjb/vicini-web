using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Collections.Concurrent;
using System.Threading;

namespace ViviniServer
{
    public class CommWorker: IDisposable
    {
        public CommWorker(IComm comm)
        {
            this.comm = comm;
        }

        public void Start()
        {
            workerThread = new Thread(Work);
            workerThread.Start();
        }

        public void Finish()
        {
            done = true;
            workerThread.Join(500);
        }

        public void Write(string data)
        {
            writeQueue.Enqueue(data);
        }

        public string Read()
        {
            var result = new StringBuilder();
            string buffer;
            while (readQueue.TryDequeue(out buffer))
            {
                result.Append(buffer);
            }
            return result.ToString();
        }

        private void Work()
        {
            string buffer;
            while (!done)
            {
                while (writeQueue.TryDequeue(out buffer))
                {
                    comm.WriteString(buffer);
                }

                buffer = comm.ReadString();
                readQueue.Enqueue(buffer);
                Thread.Sleep(0);
            }
        }

        private ConcurrentQueue<string> readQueue = new ConcurrentQueue<string>();
        private ConcurrentQueue<string> writeQueue = new ConcurrentQueue<string>();
        private IComm comm;
        private bool done = false;
        private Thread workerThread;

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    Finish();
                }

                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(true);
        }
        #endregion
    }
}
