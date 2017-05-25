using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebPDV.Models
{
    public class PessoaMap : ClassMap<Pessoa>
    {
        public PessoaMap()
        {
            Id(x => x.id);
            Map(x => x.nome);
            Map(x => x.sobrenome);
            Map(x => x.idade);
        }
    }
}