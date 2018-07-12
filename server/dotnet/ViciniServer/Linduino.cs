using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Text.RegularExpressions;

namespace ViviniServer {
    class Linduino : IComm, IDisposable
    {
        public string PortNumber { get { return portNumber; } }

        public Linduino(string portNumber)
        {
            this.portNumber = portNumber;
            this.serialPort = new SerialPort(portNumber, 115200);
        }

        public static string[] FindLinduinos(int maxLinduinos = int.MaxValue)
        {
            var portNumbers = new List<string>();

            foreach (var portNumber in SerialPort.GetPortNames()) {
                using (var sp = new SerialPort(portNumber)) {
                    try {
                        sp.Open();
                        portNumbers.Add(portNumber);
                    } catch (IOException) {
                        // already open, don't add it to the list
                    }
                }
            }

            return portNumbers.ToArray();
        }

        public void WriteString(string data)
        {
            serialPort.Write(data);
        }

        public string ReadString()
        {
            return serialPort.ReadExisting();
        }

        public void Reset(bool sleep = true)
        {
            serialPort.DtrEnable = true;
            System.Threading.Thread.Sleep(1);
            serialPort.DtrEnable = false;
            if (sleep)
            {
                System.Threading.Thread.Sleep(2000);
            }
        }

        public static string GetSketch(string resetString)
        {
            if (resetString.Trim() == "hello")
            {
                return "DC590";
            }
            var match = sketchPattern.Match(resetString);

            if (match.Groups.Count > 1)
            {
                return match.Groups[1].Value;
            }
            else
            {
                return null;
            }

        }

        public void Dispose()
        {
            ((IDisposable)serialPort).Dispose();
        }

        private string portNumber;
        private SerialPort serialPort;
        private static readonly Regex sketchPattern =
            new Regex("(DC\\d+[-_A-Za-z]*)\\s+Demonstration");
    }
}
