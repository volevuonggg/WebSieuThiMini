<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\dondathang;
use Illuminate\Support\Facades\DB;

class dondathangcontroller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dh = dondathang::all();

        return response()->json($dh);
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
        $ddh = new dondathang();
        $ddh->hovaten = $request['hovaten'];
        $ddh->diachi = $request['diachi'];
        $ddh->tinh = $request['tinh'];
        $ddh->quanhuyen = $request['quanhuyen'];
        $ddh->phuongxa = $request['phuongxa'];
        $ddh->sdt = $request['sdt'];
        $ddh->thongtinbosung = $request['thongtinbosung'];
        $ddh->pttt = $request['pttt'];
        $ddh->sanpham = $request['sanpham'];
        $ddh->dkdn_id = $request['dkdn_id'];
        $ddh->thanhtien = $request['thanhtien'];
        $ddh->tinhtrangdon = $request['tinhtrangdon'];

        $ddh->save();

        return response()->json($ddh);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $donhang = dondathang::findOrFail($id);
            $donhang->tinhtrangdon = $request->input('tinhtrangdon');
            $donhang->save();

            // Optionally, perform any additional actions or updates after successful database update

            return response()->json(['message' => 'Data updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating data'], 500);
        }
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

    public function deletedondathang($id)
    {
        $deleteddh = dondathang::where('id', $id)->first();

        $deleteddh->delete();

        return response()->json(['message' => 'xóa success']);
    }

    public function getOrderDetails($id)
    {
        try {
            // Lấy đơn hàng
            $order = dondathang::find($id);

            if (!$order || empty($order->sanpham)) {
                return response()->json([]);
            }

            // Debug: Kiểm tra dữ liệu thô
            \Log::info('Raw sanpham data:', ['sanpham' => $order->sanpham]);

            // Xử lý chuỗi sản phẩm
            $productItems = [];

            // Nếu dữ liệu là JSON
            if ($this->isJson($order->sanpham)) {
                $products = json_decode($order->sanpham, true);
                foreach ($products as $product) {
                    $productItems[] = [
                        'title' => $product['title'] ?? $product['name'] ?? 'Unknown',
                        'soluong' => $product['soluong'] ?? 1
                    ];
                }
            }
            // Nếu dữ liệu là chuỗi phân tách bằng dấu phẩy
            else {
                $productNames = array_filter(explode(',', $order->sanpham));
                foreach ($productNames as $name) {
                    $productItems[] = [
                        'title' => trim($name),
                        'soluong' => 1
                    ];
                }
            }

            // Debug: Kiểm tra dữ liệu đã xử lý
            \Log::info('Processed product items:', ['items' => $productItems]);

            return response()->json($productItems);
        } catch (\Exception $e) {
            \Log::error('Error in getOrderDetails:', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error fetching order details',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Hàm kiểm tra chuỗi JSON hợp lệ
    private function isJson($string)
    {
        json_decode($string);
        return (json_last_error() === JSON_ERROR_NONE);
    }
}
