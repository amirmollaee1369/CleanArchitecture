using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Domain.Model
{
    public class Role:Base
    {
        public string Name { get; set; }
        public string Permissions { get; set; }

        //Navigation Property
        public List<PersonRole> PersonRoles { get; set; }
    }
}
