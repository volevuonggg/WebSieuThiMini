<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
</head>
<body>
    <h1>CẢM ƠN BẠN ĐÃ ỦNG HỘ</h1>
    <p>Name: {{$order->hovaten}}</p>
    <p>Address: {{$order->diachi}}</p>
    <p>Address: {{$order->tinh}}</p>
    <p>Address: {{$order->quanhuyen}}</p>
    <p>Address: {{$order->phuongxa}}</p>
    <p>Phone Number: {{$order->sdt}}</p>
    <p>Additional Information: {{$order->thongtinbosung}}</p>
    <p>Order Date: {{$order->created_at}}</p>
    <p>Payment Method: {{$order->pttt}}</p>
    <p>Ordered Products: {{$order->sanpham}}</p>
    <p>tổng tiền: {{$order->thanhtien}}</p>
</body>
</html>
