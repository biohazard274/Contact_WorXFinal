#pragma checksum "C:\Projects\Contact_WorXFinal\MyContacts\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bbe3be409a4f1aba9b350a328b8b6cd71b763625"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Projects\Contact_WorXFinal\MyContacts\Views\_ViewImports.cshtml"
using MyContacts;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Projects\Contact_WorXFinal\MyContacts\Views\_ViewImports.cshtml"
using MyContacts.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bbe3be409a4f1aba9b350a328b8b6cd71b763625", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"011219d4a84c8d7700a90ca2f82313637167d99a", @"/Views/_ViewImports.cshtml")]
    #nullable restore
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Projects\Contact_WorXFinal\MyContacts\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Home Page";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div");
            BeginWriteAttribute("class", " class=\"", 51, "\"", 59, 0);
            EndWriteAttribute();
            WriteLiteral(@">
    <div class=""row"">

        <div class=""col-sm-12 col-md-12 col-lg-4 col-xl-4"">
            <div class=""card cssanimation2 fadeInBottom2 shadow p-3"">
                <div class=""d-flex align-items-center"">
                    <div class=""image shadow"">
                        <img src=""https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"" class=""rounded"" width=""155"">
                    </div>
                    <div class=""ml-3 w-100"">
                        <h4 class=""mb-0 mt-0"">Brandon McQuade</h4>
                        <span>Developer</span>
                        <div class=""p-2 mt-2 bg-gradient bg-warning d-flex  justify-content-between rounded text-white stats"">
                            <div class=""col text-center"">
                                <span class=""articles"">Articles</span>
                                <span class=""number1"">38</span>
                            </div>
          ");
            WriteLiteral(@"                  <div class=""col text-center"">
                                <span class=""followers"">Followers</span>
                                <span class=""number2"">980</span>
                            </div>
                            <div class=""col text-center"">
                                <span class=""rating"">Rating</span>
                                <span class=""number3"">8.9</span>
                            </div>
                        </div>
                        <div class=""button mt-2 d-flex flex-row align-items-center"">
                            <button class=""btn btn-sm btn-outline-info w-100"">Chat</button>
                            <button class=""btn btn-sm btn-info text-white w-100 ml-2"">Follow</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591
