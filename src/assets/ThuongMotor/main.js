//Thêm vào giỏ hàng
$(document).ready(function(){

            var data = sessionStorage.getItem("order");
            data = "["+data+"]";
            var orderDetails = JSON.parse(data);
            $(".cart-amount").text(orderDetails.length);

			$(".btn-buy").click(function(){
				var p = $(this).parent();
				var pImg = p.find(".product-img").attr("src");
				var pName = p.find(".product-name").text();
				var pPrice = p.find(".product-price").text();
				
                var product = {
                    "name" : pName,
                    "image" : pImg,
                    "price" : pPrice
                };

                var orderDetails = sessionStorage.getItem("order");
                if(orderDetails != null)
                    orderDetails += "," +JSON.stringify(product);
                else
                    orderDetails = JSON.stringify(product);

                //Thêm sản phẩm vừa chọn vào s
                sessionStorage.setItem("order",orderDetails);

                var c = $(".cart-amount").text();
                var amount = Number(c)+1;
                $(".cart-amount").text(amount);
			});
		});
$(document).ready(function(){
            var data = sessionStorage.getItem("order");
            data = "["+data+"]";
            var orderDetails = JSON.parse(data);
            var items = "";
            for(var i=0; i < orderDetails.length; i++)
            {
               items +=  
               `<div class="cart-item">
                    <img src="${orderDetails[i].image}" />
                    <div class="cart-product">
                        <label class="item-name">${orderDetails[i].name}</label>
                        <label class="item-delete">Xóa</label>
                    </div>
                    
                    <div class="cart-quality">
                        <input class="btn-sub" type="button" value="-" />
                        <input class="txt-quality" type="text" value="1" />
                        <input class="btn-plus" type="button" value="+" />
                    </div>

                    <div class="cart-price">
                        <label class="item-price">${orderDetails[i].price}</label>
                    </div>
                    
                </div>`;
            }

            $("#content-left").html(items);

            $(".cart-amount").text(orderDetails.length);
            
            $(".btn-plus").click(function(){
                var amount = $(this).prev().attr("value");
                $(this).prev().attr("value",Number(amount)+1);
            })
            $(".btn-sub").click(function(){
                var amount = $(this).next().attr("value");
                if(Number(amount >1))
                $(this).next().attr("value",Number(amount)-1);
            })
            $(".item-delete").click(function(){
                if(confirm('Bạn có chắc muốn xóa sản phẩm không?')){
                        $(this).parent().parent().remove();
                    }
                })
            
            
        });

