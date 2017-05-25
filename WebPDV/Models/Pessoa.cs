using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebPDV.Models
{
    public class Pessoa
    {
        public virtual long id { get; set; }
        public virtual String nome { get; set; }
        public virtual String sobrenome { get; set; }
        public virtual int idade{ get; set; }

        public Pessoa()
        {

        }

        public Pessoa(String n, String sn, int i) : this()
        {
            this.nome = n;
            this.sobrenome = sn;
            this.idade = i;
        }

        public override bool Equals(object obj)
        {
            if (obj.GetType().Equals(typeof(Pessoa))){
                Pessoa p = (Pessoa)obj;
                return p.id == this.id;
            }
            return false;
        }
    }
}