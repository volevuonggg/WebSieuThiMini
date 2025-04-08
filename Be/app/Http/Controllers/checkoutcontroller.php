<?php

namespace App\Http\Controllers;

use App\Models\cart;
use App\Models\dondathang;
use App\Models\checkout;
use Illuminate\Http\Request;

class checkoutcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Lấy dữ liệu từ request thay vì database
        $madonhang = $request->orderId;
        $sotien = $request->amount;

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_ReturnUrl = "http://localhost:3000/thanh-toan";
        $vnp_TmnCode = "FSG1L7C8";
        $vnp_HashSecret = "6XULDMA8EL63R00RAC3LE9F6L7YLFLOS";

        $vnp_TxnRef = $madonhang;
        $vnp_OrderInfo = 'Thanh toan don hang';
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $sotien * 100;
        $vnp_Locale = 'vn';
        $vnp_IpAddr = request()->ip();

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_ReturnUrl,
            "vnp_TxnRef" => $vnp_TxnRef
        );

        ksort($inputData);
        $query = http_build_query($inputData);
        $hashdata = hash_hmac('sha512', $query, $vnp_HashSecret);
        $vnp_Url .= "?" . $query . '&vnp_SecureHash=' . $hashdata;

        return response()->json([
            'code' => '00',
            'message' => 'success',
            'data' => $vnp_Url
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vnpay = new checkout;
        $vnpay->sanpham = $request['tenspclient'];
        $vnpay->sotien = $request['tongtienclient'];

        $vnpay->nganhang = $request['nganhangclient'];
        $vnpay->madonhang = $request['madonhangclient'];
        $vnpay->dkdn_id = $request['dkdn_id'];

        $vnpay->save();

        return response()->json($vnpay);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $thongtin = cart::where('dkdn_id', $id)->get();

        return response()->json($thongtin);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {}

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
