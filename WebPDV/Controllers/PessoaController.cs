using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebPDV.Models;

namespace WebPDV.Controllers
{
    public class PessoaController : Controller
    {
        private static IList<Pessoa> pessoas = new List<Pessoa>();

        //
        // GET: /Pessoa/

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Cadastro()
        {
            return View();
        }

        public ActionResult Lista(String nome)
        {
            IList<Pessoa> lp = DataAccess.getPessoas();
            if (nome != null)
            {
                return View(lp.Where(i => i.nome.Contains(nome)).ToList());
            }
            return View(lp);
        }

        public String Adiciona(String nome, String sobrenome, int idade)
        {
            Pessoa p = new Pessoa(nome.ToUpper(), sobrenome.ToUpper(), idade);
            //pessoas.Add(p);
            DataAccess.addPessoa(p);

            return "Adicionado";
        }

        public ActionResult Alteracao(long id)
        {
            return View(DataAccess.getPessoa(id));
        }

        public String ConfirmaAltera(long id, String nome, String sobrenome, int idade)
        {
            Pessoa p = new Pessoa(nome.ToUpper(), sobrenome.ToUpper(), idade);
            p.id = id;

            DataAccess.editPessoa(p);

            return "Alterado";
        }

        public String Exclui(int id)
        {
            Pessoa p = new Pessoa();
            p.id = id;
            //pessoas.Remove(p);
            DataAccess.delPessoa(p);
            return "Excluído";
        }

        public String GetJson()
        {
            //IList<Pessoa> lp = pessoas;
            IList<Pessoa> lp = DataAccess.getPessoas();

            /*int echo = Int32.Parse(Request.Params["sEcho"]);
            int displayLength = Int32.Parse(Request.Params["iDisplayLength"]);
            int displayStart = Int32.Parse(Request.Params["iDisplayStart"]);
            string search = Request.Params["sSearch"];*/

            IEnumerable<Object> obj = lp.Select(o => o.GetType().GetProperties().Select(p => p.GetValue(o, null)));

            dynamic x = new { draw = 2, recordsTotal = lp.Count, recordsFiltered = lp.Count, data = obj };

            return JsonConvert.SerializeObject(x);
        }

    }
}
