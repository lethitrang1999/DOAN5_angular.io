using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public partial interface IProductGroupRepository
    {
        List<ProductGroupModel> GetData();
        bool Create(ProductGroupModel model);

        bool Update(ProductGroupModel model);
        bool Delete(ProductGroupModel model);

        ProductGroupModel GetDatabyID(string id);
      
      
   
    }
}
