using LibUFT;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LinduinoConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var serialNumbers = Linduino.FindLinduinos();
            var linduinos = new List<Linduino>();
            foreach (var sn in serialNumbers)
            {
                linduinos.Add(new Linduino(sn));
            }


            for (int i = 0; i < 3; ++i)
            {
                foreach (var linduino in linduinos)
                {
                    linduino.Reset(false);
                }
                System.Threading.Thread.Sleep(2000);
                foreach (var linduino in linduinos)
                {
                    var result = linduino.ReadString();
                    var sketch = Linduino.GetSketch(result);
                    Console.WriteLine($"{linduino.SerialNumber}:{sketch}");
                }
                System.Threading.Thread.Sleep(100);
            }

            foreach (var linduino in linduinos)
            {
                linduino.Dispose();
            }
        }
    }
}
