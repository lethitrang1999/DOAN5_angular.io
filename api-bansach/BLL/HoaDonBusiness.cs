using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public partial class HoaDonBusiness : IHoaDonBusiness
    {
        private IHoaDonRepository _res;
        public HoaDonBusiness(IHoaDonRepository res)
        {
            _res = res;
        }
        public bool Create(HoaDonModel model)
        {
            return _res.Create(model);
        }
        public bool UpdateHD(HoaDonModel model)
        {
            return _res.UpdateHD(model);
        }

        public bool DeleteHD(HoaDonModel model)
        {
            return _res.DeleteHD(model);
        }
        public HoaDonModel GetDatabyID(string id)
        {
            return _res.GetDatabyID(id);
        }
        public List<HoaDonModel> GetDataHoaDon()
        {
            return _res.GetDataHoaDon();
        }
        public List<HoaDonModel> Search(int pageIndex, int pageSize, out long total, string ma_hoa_don)
        {
            return _res.Search(pageIndex, pageSize, out total, ma_hoa_don);
        }

    }

}
