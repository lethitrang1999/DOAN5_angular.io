using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Model;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private IItemBusiness _itemBusiness;
        public ItemController(IItemBusiness itemBusiness)
        {
            _itemBusiness = itemBusiness;
        }

        [Route("create-item")]
        [HttpPost]
        public ProductModel CreateItem([FromBody] ProductModel model)
        {
            _itemBusiness.Create(model);
            return model;
        }

        [Route("update-item")]
        [HttpPost]
        public ProductModel UpdateItem([FromBody] ProductModel model)
        {
            _itemBusiness.Update(model);
            return model;
        }

        [Route("delete-item")]
        [HttpPost]
        public ProductModel DeleteItem([FromBody] ProductModel model)
        {
            _itemBusiness.Delete(model);
            return model;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public ProductModel GetDatabyID(string id)
        {
            return _itemBusiness.GetDatabyID(id);
        }
        [Route("get-all")]
        [HttpGet]
        public IEnumerable<ProductModel> GetDatabAll()
        {
            return _itemBusiness.GetDataAll();
        }

        [Route("get-khuyenmai")]
        [HttpGet]
        public IEnumerable<ProductModel> GetDatakhuyenmai()
        {
            return _itemBusiness.GetDatakhuyenmai();
        }
        [Route("search")]
        [HttpPost]
        public ResponseModel Search([FromBody] Dictionary<string, object> formData)
        {
            var response = new ResponseModel();
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string item_group_id = "";
                if (formData.Keys.Contains("item_group_id") && !string.IsNullOrEmpty(Convert.ToString(formData["item_group_id"]))) { item_group_id = Convert.ToString(formData["item_group_id"]); }
                long total = 0;
                var data = _itemBusiness.Search(page, pageSize,out total,  item_group_id);
                response.TotalItems = total;
                response.Data = data;
                response.Page = page;
                response.PageSize = pageSize;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return response;
        }

    }
}
