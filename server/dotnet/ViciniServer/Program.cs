using Nancy.Hosting.Self;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Threading;

namespace ViviniServer
{
    static class Program
    {
        static void Main(string[] argv)
        {
            var hostStr = "http://localhost:7651";
            if (argv.Length == 1)
            {
                hostStr = argv[0];
            }

            var config = new HostConfiguration();
            config.RewriteLocalhost = false;

            using (var host = new NancyHost(config, new Uri(hostStr)))
            {
                host.Start();
                Process.Start(hostStr);
                Console.WriteLine($"Running on {hostStr}");
                Console.WriteLine("If you closed the browser without exiting " +
                    "just close the window with the \"X\" at the top right.");
                Server.Wait();
                Console.WriteLine("Sutting down.");
                Thread.Sleep(500);
            }
        }
    }
}
