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
    public class HoaDonController : ControllerBase
    {
        private IHoaDonBusiness _hoaDonBusiness;
        private object _hoadonBusiness;

        public HoaDonController(IHoaDonBusiness hoaDonBusiness)
        {
            _hoaDonBusiness = hoaDonBusiness;
        }
        

        [Route("get-by-id/{id}")]
        [HttpGet]
        public HoaDonModel GetDatabyID(string id)
        {
            return _hoaDonBusiness.GetDatabyID(id);
        }
        [Route("get-all-hoadon")]
        [HttpGet]
        public IEnumerable<HoaDonModel> GetDatabHoaDon()
        {
            return _hoaDonBusiness.GetDataHoaDon();
        }
        [Route("create-hoa-don")]
        [HttpPost]
        public HoaDonModel CreateHoaDon([FromBody] HoaDonModel model)
        {
            model.ma_hoa_don = Guid.NewGuid().ToString();
            if (model.listjson_chitiet != null)
            {
                foreach (var item in model.listjson_chitiet)
                    item.ma_chi_tiet = Guid.NewGuid().ToString();
            }
            _hoaDonBusiness.Create(model);
            return model;
        }
        [Route("update-hoa-don")]
        [HttpPost]
        public HoaDonModel UpdateHoaDon([FromBody] HoaDonModel model)
        {
            if (model.listjson_chitiet != null)
            {
                foreach (var item in model.listjson_chitiet)
                    item.ma_chi_tiet = Guid.NewGuid().ToString();
            }
            _hoaDonBusiness.UpdateHD(model);
            return model;
        }
        [Route("delete-hoa-don")]
        [HttpPost]
        public HoaDonModel DeleteHoaDon([FromBody] HoaDonModel model)
        {
            if (model.listjson_chitiet != null)
            {
                foreach (var item in model.listjson_chitiet)
                    item.ma_chi_tiet = Guid.NewGuid().ToString();
            }
            _hoaDonBusiness.DeleteHD(model);
            return model;
        }
    }
}

    

