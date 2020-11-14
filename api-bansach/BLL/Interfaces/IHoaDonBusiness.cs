using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public partial interface IHoaDonBusiness
    {
        bool Create(HoaDonModel model);
        HoaDonModel GetDatabyID(string id);
        bool UpdateHD([FromBody] HoaDonModel model);
        bool DeleteHD([FromBody] HoaDonModel modell);
        List<HoaDonModel> GetDataHoaDon();
        List<HoaDonModel> Search(int pageIndex, int pageSize, out long total, string ma_hoa_don);
     
 
        






    }
}
