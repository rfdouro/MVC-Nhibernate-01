using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using System.Reflection;
using WebPDV.Models;
using NHibernate.Dialect;

namespace WebPDV
{
    public class DataAccess
    {
        static ISessionFactory isessionFactory = null;

        private static ISessionFactory GetSessionFactory()
		{
			if(isessionFactory==null){
				FluentConfiguration config = Fluently.Configure()
					.Database(MySQLConfiguration.Standard
					          .Dialect<MySQLDialect>()
					          .ConnectionString("Server=localhost;Database=sisadin;Uid=root;Pwd=salesiano;Port=3306").ShowSql())
					.ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(true, true))
					//.ExposeConfiguration(cfg => new SchemaExport(cfg).SetOutputFile("C:\\scripts.sql").Create(true, false))
					.Mappings(m =>
					          {
					          	m.FluentMappings.AddFromAssembly(Assembly.Load("WebPDV"));
					          });
				
				isessionFactory = config.BuildSessionFactory();
			}

			return isessionFactory;
		}

        /*private static ISessionFactory GetSessionFactory()
        {
            if (isessionFactory == null)
            {
                FluentConfiguration config = Fluently.Configure()
                    .Database(
                        SQLiteConfiguration.Standard
                        .UsingFile("database.db"))
                    .ExposeConfiguration(cfg => new SchemaUpdate(cfg).Execute(true, true))
                    .Mappings(m =>
                    {
                        m.FluentMappings.AddFromAssembly(Assembly.Load("WebPDV"));
                    });

                isessionFactory = config.BuildSessionFactory();
            }

            return isessionFactory;
        }*/

        public static void addPessoa(Pessoa p)
        {
            ISessionFactory sessionFactory = GetSessionFactory();
            using (var session = sessionFactory.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Save(p);

                        transaction.Commit();
                    }

                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new HttpException("Erro " + ex.Message);
                    }
                }
            }
        }

        public static void editPessoa(Pessoa p)
        {
            ISessionFactory sessionFactory = GetSessionFactory();
            using (var session = sessionFactory.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        session.Update(p);

                        transaction.Commit();
                    }

                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new HttpException("Erro " + ex.Message);
                    }
                }
            }
        }

        public static void delPessoa(Pessoa p)
        {
            ISessionFactory sessionFactory = GetSessionFactory();
            using (var session = sessionFactory.OpenSession())
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    try
                    {
                        Pessoa x = session.Get<Pessoa>(p.id);
                        
                        session.Delete(x);

                        transaction.Commit();
                    }

                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new HttpException("Erro " + ex.Message);
                    }
                }
            }
        }

        public static Pessoa getPessoa(long id)
        {
            ISessionFactory sessionFactory = GetSessionFactory();
            using (var session = sessionFactory.OpenSession())
            {
                try
                {
                    return session.Get<Pessoa>(id);
                }
                catch (Exception ex)
                {
                    throw new HttpException("Erro " + ex.Message);
                }
            }
            return null;
        }

        public static IList<Pessoa> getPessoas()
        {
            ISessionFactory sessionFactory = GetSessionFactory();
            using (var session = sessionFactory.OpenSession())
            {
                try
                {
                    IQuery q = session.CreateQuery("select P from Pessoa P");
                    return q.List<Pessoa>();
                }
                catch (Exception ex)
                {
                    throw new HttpException("Erro " + ex.Message);
                }
            }
            return null;
        }
    }
}