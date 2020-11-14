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
    public class ItemGroupController : ControllerBase
    {
        private IItemGroupBusiness _itemGroupBusiness;
        public ItemGroupController(IItemGroupBusiness itemGroupBusiness)
        {
            _itemGroupBusiness = itemGroupBusiness;
        }

        [Route("get-menu")]
        [HttpGet]
        public IEnumerable<ProductGroupModel> GetAllMenu()
        {
            return _itemGroupBusiness.GetData();
        }
        [Route("create-item-group")]
        [HttpPost]
        public ProductGroupModel CreateItemFroup([FromBody] ProductGroupModel model)
        {
            model.item_group_id = Guid.NewGuid().ToString();
            _itemGroupBusiness.Create(model);
            return model;
        }

        [Route("update-item-group")]
        [HttpPost]
        public ProductGroupModel UpdateItemGroup([FromBody] ProductGroupModel model)
        {
            _itemGroupBusiness.Update(model);
            return model;
        }

        [Route("delete-item-group")]
        [HttpPost]
        public ProductGroupModel DeleteItemGroup([FromBody] ProductGroupModel model)
        {
            _itemGroupBusiness.Delete(model);
            return model;
        }

        [Route("get-by-id/{id}")]
        [HttpGet]
        public ProductGroupModel GetDatabyID(string id)
        {
            return _itemGroupBusiness.GetDatabyID(id);
        }
        
    }
}
