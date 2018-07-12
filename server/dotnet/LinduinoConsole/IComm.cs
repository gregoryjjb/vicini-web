using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LinduinoConsole
{
    interface IComm
    {
        void WriteString(string data);
        string ReadString();
    }
}
