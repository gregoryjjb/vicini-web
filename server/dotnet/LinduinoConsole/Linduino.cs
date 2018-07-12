using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LibUFT;
using System.Text.RegularExpressions;

namespace LinduinoConsole
{
    class Linduino: IComm, IDisposable
    {
        public string SerialNumber { get { return serialNumber; } }

        public Linduino(string serialNumber)
        {
            this.serialNumber = serialNumber;
            this.ftdi = Ftdi.Open(serialNumber);
        }

        public static string[] FindLinduinos(int maxLinduinos = int.MaxValue)
        {
            var serialNumbers = new List<string>();
            int index = 0;
            string id;
            string sn;
            while (Ftdi.FindController2(ref index, ControllerType.Linduino, out id, out sn))
            {
                serialNumbers.Add(sn);
                if (serialNumbers.Count >= maxLinduinos)
                {
                    break;
                }
            }
            return serialNumbers.ToArray();
        }

        public void WriteString(string data)
        {
            ftdi.Write(Encoding.ASCII.GetBytes(data));
        }

        public string ReadString()
        {
            return ftdi.ReadAllAsString();
        }

        public void Reset(bool sleep = true)
        {
            ftdi.SetDtr(true);
            System.Threading.Thread.Sleep(1);
            ftdi.SetDtr(false);
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
            } else
            {
                return null;
            }
            
        }

        public void Dispose()
        {
            ((IDisposable)ftdi).Dispose();
        }

        private string serialNumber;
        private Ftdi ftdi;
        private static readonly Regex sketchPattern = 
            new Regex("(DC\\d+[-_A-Za-z]*)\\s+Demonstration");
    }
}
