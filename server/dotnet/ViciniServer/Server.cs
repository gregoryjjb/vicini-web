using Nancy;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace ViviniServer
{
    public class Server : NancyModule
    {
        public enum Status
        {
            Ok,
            Error,
        }

        public class StatusResponse {
            public string Status;
            public string Message;
            public StatusResponse(Status status, string message)
            {
                Status = status.ToString();
                Message = message;
            }
        }

        private Response MakeStatusResponse(Status status, string message)
        {
            return Response.AsJson(new StatusResponse(status, message));
        }

        private Response MakeNoBoardResponse(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return MakeStatusResponse(
                    Status.Error,
                    "Must call /linduino/start/{id} to start a Linduino");
            } else
            {
                return MakeStatusResponse(
                        Status.Error,
                        $"No Linduino setup for {id} found, check hardware and sketch");
            }
        }

        public Server()
        {
            Get["/"] = _ =>
            {
                return Response.AsFile("index.html");
            };

            Get["/linduino/exit"] = _ =>
            {
                CommWorker worker;
                foreach (var key in commWorkers.Keys)
                {
                    if (commWorkers.TryRemove(key, out worker))
                    {
                        worker.Finish();
                    }
                }
                resetEvent.Set();
                return MakeStatusResponse(
                    Status.Ok,
                    "Exiting");
            };

            Get["/linduino/find/"] = _ =>
            {
                var ids = Linduino.FindLinduinos();

                    return MakeStatusResponse(
                        Status.Ok,
                        string.Join(",", ids));
            };

            Get["/linduino/start/{id}"] = p =>
            {
                var linduino = new Linduino(p.id);
                var commWorker = new CommWorker(linduino);
                commWorkers[p.id] = commWorker;
                commWorker.Start();
                return MakeStatusResponse(Status.Ok, "started");
            };

            Get["/linduino/write/{id}/{text}"] = p =>
            {
                CommWorker worker;
                if (commWorkers.TryGetValue(p.id, out worker))
                {
                    worker.Write(p.text);
                    return MakeStatusResponse(Status.Ok, "text written");
                }
                else
                {
                    return MakeNoBoardResponse(p.id);
                }
            };

            Get["/linduino/read/{id}"] = p =>
            {
                CommWorker worker;
                if (commWorkers.TryGetValue(p.id, out worker))
                {
                    var data = worker.Read();
                    return MakeStatusResponse(Status.Ok, data);
                } else
                {
                    return MakeNoBoardResponse(p.id);
                }
            };

            Get["/linduino/close/{id}"] = p =>
            {
                CommWorker worker;
                if (commWorkers.TryRemove(p.id, out worker))
                {
                    worker.Finish();
                    return MakeStatusResponse(Status.Ok, "closed");
                }
                else
                {
                    return MakeNoBoardResponse(p.id);
                }
            };


        }

        public static void Wait()
        {
            resetEvent.WaitOne();
            resetEvent.Reset();
        }

        private static ManualResetEvent resetEvent = new ManualResetEvent(false);
        private static ConcurrentDictionary<string, CommWorker> commWorkers = 
            new ConcurrentDictionary<string, CommWorker>();
    }
}
