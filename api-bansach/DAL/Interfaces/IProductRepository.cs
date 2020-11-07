using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public partial interface IProductRepository
    {
        bool Create(ProductModel model);

        bool Update(ProductModel model);
        bool Delete(ProductModel model);

        ProductModel GetDatabyID(string id);
        List<ProductModel> GetDataAll();
        List<ProductModel> GetDatakhuyenmai();
        List<ProductModel> Search(int pageIndex, int pageSize, out long total, string item_group_id);
    }
}
