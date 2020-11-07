using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public partial interface IHoaDonRepository
    {
      
        bool Create(HoaDonModel model);
        bool UpdateHD(HoaDonModel model);
        bool DeleteHD(HoaDonModel model);
       
        HoaDonModel GetDatabyID(string id);
        List<HoaDonModel> GetDataHoaDon();
      
        List<HoaDonModel> Search(int pageIndex, int pageSize, out long total, string ma_hoa_don);
    }
}
