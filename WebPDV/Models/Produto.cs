using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebPDV.Models
{
    public class Produto
    {
        static int x = 0;
        public int Id { get; set;  }
        public String Nome { get; set; }
        public Produto()
        {
            this.Id = ++x;
        }
    }
}