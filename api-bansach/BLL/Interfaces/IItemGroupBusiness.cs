using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL
{
    public partial interface IItemGroupBusiness
    {
        List<ProductGroupModel> GetData();
        bool Create(ProductGroupModel model);

        bool Update(ProductGroupModel model);

        bool Delete(ProductGroupModel model);

        ProductGroupModel GetDatabyID(string id);
    
     
    }
}
