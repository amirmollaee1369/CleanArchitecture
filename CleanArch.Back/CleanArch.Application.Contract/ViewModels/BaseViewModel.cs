using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArch.Application.Contract.ViewModels
{
    public class BaseViewModel
    {
        [Key]
        public int Id { get; set; }
    }
}
