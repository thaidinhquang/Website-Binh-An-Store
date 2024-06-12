base url: http://localhost:8000/api

("/auth", routerAuth);
post("/sign-up", signUp); {email, password}
post("/sign-in", signIn); {email, password}
use(getUser)
get("/", getUserByToken);

("/role", routerRole);
get("/", getAllRole);
get("/:id", getRoleById);
get("/name/:name", getRoleByName);
delete("/:id", checkPermission('delete_role'), removeRoleById);
use(checkRequestBody(roleSchema))
post("/", checkPermission('create_role'), createRole); {name}
put("/:id", checkPermission('update_role'), updateRole); (name, ...option(create_role, update_role, ...))

("/cart", routerCart);
routerCart.use(getUser)
get("/", getCartByUserId); // lay cart, khong can truyen token, token lay tu header
get("/count", getCartCount); // dem so product trong cart
get("/total", getCartTotal); // tong so tien product trong cart
post("/add-item", addItemToCart); {productId, quantity} // them product vao cart
post("/remove-item", removeItemFromCart); {productId} // xoa product trong cart
post("/update-item", updateItemInCart); {productId, quantity} // update so luong product trong cart theo id product
post("/clear", clearCart); // xoa het product khoi cart
post("/increase-quantity", increeaseItemQuantity); {productId} // +1 product trong cart theo id product
post("/decrease-quantity", decreaseItemQuantity); {productId} // -1 product trong cart theo id product