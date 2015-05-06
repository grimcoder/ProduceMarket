using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ProduceMarketWebApi.Models;

namespace ProduceMarketWebApi.Controllers
{
    public class PricesController : ApiController
    {

        private static List<ItemPrice> itemPrices;

        private static List<ItemPrice> ItemPrices
        {
            get
            {
                if (itemPrices == null) 
                    itemPrices = new List<ItemPrice>()
                        {
                            new ItemPrice(){Id = 1, ItemName = "Potato", Price = 1.0d}, 
                            new ItemPrice(){Id = 2, ItemName = "Cabbage", Price = 2.0d}, 
                            new ItemPrice(){Id = 3, ItemName = "Oranges", Price = 1.25d}, 
                            new ItemPrice(){Id = 4, ItemName = "Carrots", Price = 1.60d}, 
                        };
                
                return itemPrices;
            }
        }

        // GET api/values
        public IEnumerable<ItemPrice> Get()
        {
            return ItemPrices;
        }

        // GET api/values/5
        public ItemPrice Get(int id)
        {
            return ItemPrices.FirstOrDefault(price => price.Id == id);
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}