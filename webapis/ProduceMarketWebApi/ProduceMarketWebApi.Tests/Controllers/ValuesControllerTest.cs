﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ProduceMarketWebApi;
using ProduceMarketWebApi.Controllers;

namespace ProduceMarketWebApi.Tests.Controllers
{
    [TestClass]
    public class PricesControllerTest
    {
        [TestMethod]
        public void Get()
        {
            // Arrange
            PricesController controller = new PricesController();

            // Act
            var result = controller.Get();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            Assert.AreEqual("value1", result.ElementAt(0));
            Assert.AreEqual("value2", result.ElementAt(1));
        }

        [TestMethod]
        public void GetById()
        {
            // Arrange
            PricesController controller = new PricesController();

            // Act
            var result = controller.Get(5);

            // Assert
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            // Arrange
            PricesController controller = new PricesController();

            // Act
            controller.Post("value");

            // Assert
        }

        [TestMethod]
        public void Put()
        {
            // Arrange
            PricesController controller = new PricesController();

            // Act
            controller.Put(5, "value");

            // Assert
        }

        [TestMethod]
        public void Delete()
        {
            // Arrange
            PricesController controller = new PricesController();

            // Act
            controller.Delete(5);

            // Assert
        }
    }
}