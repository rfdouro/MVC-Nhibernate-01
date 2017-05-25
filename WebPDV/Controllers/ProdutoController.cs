using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebPDV.Models;

namespace WebPDV.Controllers
{
    public class ProdutoController : Controller
    {
        //
        // GET: /Produto/

        public ActionResult Index()
        {
            if(Session["produtos"]==null)
                Session["produtos"] = new List<Produto>();
            return View(Session["produtos"]);
        }

        public ActionResult Adiciona()
        {
            List<Produto> lp = (List<Produto>)Session["produtos"];
            Produto p = new Produto();
            p.Nome = Request["nome"];
            lp.Add(p);
            Session["produtos"] = lp;
            return View("Index", Session["produtos"]);
        }

        public String AdicionaStr()
        {
            List<Produto> lp = (List<Produto>)Session["produtos"];
            Produto p = new Produto();
            p.Nome = Request["nome"];
            lp.Add(p);
            Session["produtos"] = lp;
            return "Registro adicionado";
        }

        public JsonResult GetJson()
        {
            List<Produto> lp = (List<Produto>)Session["produtos"];

            return Json(lp, JsonRequestBehavior.AllowGet);
        }

        public static IEnumerable<object> GetObjectArray<T>(IEnumerable<T> obj)
        {
            return obj.Select(o => o.GetType().GetProperties().Select(p => p.GetValue(o, null)));
        }

        public String GetJson2()
        {
            List<Produto> lp = (List<Produto>)Session["produtos"];

            /*int echo = Int32.Parse(Request.Params["sEcho"]);
            int displayLength = Int32.Parse(Request.Params["iDisplayLength"]);
            int displayStart = Int32.Parse(Request.Params["iDisplayStart"]);
            string search = Request.Params["sSearch"];*/

            dynamic x = new { draw= 2,  recordsTotal= lp.Count,  recordsFiltered= lp.Count, data= GetObjectArray(lp) };

            return JsonConvert.SerializeObject(x);
        }

        public ActionResult GetDataTable()
        {
            return View();
        }

    }
}
