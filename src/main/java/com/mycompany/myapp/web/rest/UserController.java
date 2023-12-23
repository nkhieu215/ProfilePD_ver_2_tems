package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.UserServices;
import java.util.List;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

// ! chưa làm được
// ? Chưa test với front-end
// * Ngăn cách
// ☺ đã Test với front-end
@RestController
@RequestMapping("/api")
@Transactional
public class UserController {

    @Autowired
    private UserServices userServices;

    protected Logger logger;

    //☺ Template login - Chức năng xác thực tài khoản
    //    @PostMapping("/login")
    //    public ResponseMessage getByName(@RequestBody UserPostRequest request) {
    //        ResponseMessage result = userServices.loginAuth(request);
    //        return result;
    //    }
    //------------------------------------------------ * ---------------------------------------------------------------

    //---------------------------         Template Quản lý thông số      -----------------------------------------------

    //☺ Hiển thị danh sách thông số
    @GetMapping("/quan-ly-thong-so")
    public List<QuanLyThongSo> danhSachThongSo() {
        List<QuanLyThongSo> responseList = this.userServices.danhSachThongSo();

        return responseList;
    }

    //☺ Xoá thông số theo mã thông số
    @DeleteMapping("/quan-ly-thong-so/del-by-ma-thong-so/{maThongSo}")
    public void delByMaThongSo(@PathVariable String maThongSo) {
        this.userServices.delByThongSo(maThongSo);
    }

    //☺ Thêm mới thông số
    @PostMapping("/quan-ly-thong-so/them-moi-thong-so")
    public String postThongSo(@RequestBody List<QuanLyThongSo> requests) {
        String result = this.userServices.postThongSo(requests);
        return result;
    }

    //☺ xem chi tiet thong so
    @GetMapping("/quan-ly-thong-so/chi-tiet-thong-so/{maThongSo}")
    public List<QuanLyThongSo> getChiTietThongSo(@PathVariable String maThongSo) {
        List<QuanLyThongSo> responseList = this.userServices.getChiTietThongSo(maThongSo);
        return responseList;
    }

    //☺ cập nhật thông số
    @PutMapping("/quan-ly-thong-so/cap-nhat-thong-so/{maThongSo}")
    public String putThongSo(@PathVariable String maThongSo, @RequestBody QuanLyThongSo request) {
        String result = this.userServices.putThongSo(request, maThongSo);
        return result;
    }

    //☺ su kien tim kiem
    @PostMapping("/quan-ly-thong-so/tim-kiem")
    public List<QuanLyThongSo> timKiemThongSo(@RequestBody QuanLyThongSo request) {
        List<QuanLyThongSo> responseList = this.userServices.timKiemThongSo(request);
        return responseList;
    }

    //------------------------------------------------ * ---------------------------------------------------------------

    //--------------------------------             Thiết bị               ---------------------------------------------

    //☺ Hiển thị danh  sách thiết bị
    @GetMapping("/thiet-bi")
    public List<ThietBi> danhSachThietBi() {
        List<ThietBi> responseList = this.userServices.danhSachThietBi();
        return responseList;
    }

    //☺ Tìm kiếm
    @PostMapping("/thiet-bis/tim-kiem")
    public List<ThietBi> getThietBiByStatus(@RequestBody ThietBi request) {
        List<ThietBi> responseList = this.userServices.timKiemThietBi(request);
        System.out.println(request.toString());
        return responseList;
    }

    //----------------------- Chức năng thêm mới thiết bị -----------------------------------------------
    //? thêm mới thiết bị vào DB
    @PostMapping("/thiet-bi/them-moi-thiet-bi")
    public String postThietBi(@RequestBody ThietBi request) {
        String result = this.userServices.postThietBi(request);
        return result;
    }

    //☺ del thông số thiết bị ->xoá luôn cả thông số thiết bị
    @DeleteMapping("/thiet-bi/del-thiet-bi/{id}")
    public void delThietBi(@PathVariable Long id) {
        this.userServices.delThongSoMay(id);
    }

    //☺ thêm mới thông số thiết bị vào DB
    @PostMapping("/thiet-bi/them-moi-thong-so-thiet-bi")
    public void postThongSoMay(@RequestBody List<ThongSoMay> requestList) {
        this.userServices.postThongSoMay(requestList);
    }

    //☺ xem danh sách thông số thiết bị bằng Nhóm thiết bị
    @GetMapping("/thiet-bi/danh-sach-thong-so-thiet-bi/{loaiThietBi}")
    public List<ThongSoMay> getDanhSachThongSoMay(@PathVariable String loaiThietBi) {
        List<ThongSoMay> responseList = this.userServices.getDanhSachThongSoThietBiByLoaiThietBi(loaiThietBi);
        return responseList;
    }

    //☺ xem danh sách thông số thiết bị bằng Nhóm thiết bị và mã thiết bị
    @PostMapping("/thiet-bi/danh-sach-thong-so-thiet-bi")
    public List<ThongSoMay> getDanhSachThongSoMays(@RequestBody ThongSoMay request) {
        List<ThongSoMay> responseList = this.userServices.getDanhSachThongSoThietBiByLoaiThietBiAndMaThietBi(request);
        return responseList;
    }

    //☺ xem danh sách thông số thiết bị bằng id thiet bi
    @GetMapping("/thiet-bi/thong-so-thiet-bi/thiet-bi-id/{thietBiId}")
    public List<ThongSoMay> getDanhSachThongSoMayById(@PathVariable Long thietBiId) {
        List<ThongSoMay> responseList = this.userServices.getDanhSachThongSoThietBiById(thietBiId);
        return responseList;
    }

    //      //☺ xem danh sách thông số thiết bị bằng mã thiết bị
    //    @GetMapping("/thiet-bi/danh-sach-thong-so-thiet-bi/{maThietBi}")
    //    public List<ThongSoMay> getDanhSachThongSoMay(@PathVariable String maThietBi){
    //        List<ThongSoMay> responseList = this.userServices.getDanhSachThongSoThietBi(maThietBi);
    //        return responseList;
    //    }
    //☺ del thông số thiết bị
    @DeleteMapping("/thiet-bi/del-thong-so-may/{idThongSoThietBi}")
    public void delByIdThongSoThietBi(@PathVariable Long idThongSoThietBi) {
        this.userServices.delByIdThongSoThietBi(idThongSoThietBi);
    }

    //☺Cập nhật thông số máy
    @PutMapping("/thiet-bi/cap-nhat")
    public void putThongSoMay(@RequestBody List<ThongSoMay> requestList) {
        this.userServices.putThongSoMay(requestList);
    }

    //☺xem chi tiết thông số thiet bi
    @GetMapping("/thiet-bi/chi-tiet-thiet-bi/{id}")
    public ThietBi getAllByMaThongSo(@PathVariable Long id) {
        ThietBi responseList = this.userServices.getAllById(id);
        return responseList;
    }

    //------------------------------------------------ * ---------------------------------------------------------------

    //---------------------------------------              Kich ban                ------------------------------------

    //☺ Hien thi danh sach kich ban
    @GetMapping("/kich-ban")
    public List<KichBan> getAllKichBan() {
        List<KichBan> responseList = this.userServices.getDanhSachKichBan();
        return responseList;
    }

    //☺ Tim kiem kich ban
    @PostMapping("/kich-bans/tim-kiem")
    public List<KichBan> timKiemKichBan(@RequestBody KichBan request) {
        List<KichBan> responseList = this.userServices.timKiemKichBan(request);
        return responseList;
    }

    //☺ Them moi kich ban
    @PostMapping("/kich-ban/them-moi-kich-ban")
    public String postKichBan(@RequestBody KichBan request) {
        String result = this.userServices.postKichBan(request);
        return result;
    }

    //☺Them moi thong tin thong so kich ban
    @PostMapping("/kich-ban/them-moi-thong-so-kich-ban")
    public void postChiTietKichBan(@RequestBody List<ChiTietKichBan> requestList) {
        this.userServices.postChiTietKichBan(requestList);
    }

    //☺Xem danh sach thong so kich ban theo id kịch bản
    @GetMapping("/kich-ban/thong-so-kich-ban/{kichBanId}")
    public List<ChiTietKichBan> getAllByIdKichBan(@PathVariable Long kichBanId) {
        List<ChiTietKichBan> responseList = this.userServices.getAllByIdKichBan(kichBanId);
        return responseList;
    }

    //☺Xem danh sach thong so kich ban theo mã kịch bản
    @GetMapping("/kich-ban/thong-so-kich-ban/ma-kich-ban/{maKichBan}")
    public List<ChiTietKichBan> getAllByMaKichBan(@PathVariable String maKichBan) {
        List<ChiTietKichBan> responseList = this.userServices.getAllByMaKichBan(maKichBan);
        return responseList;
    }

    //☺ cap nhat thong so kich ban
    @PutMapping("/kich-ban/cap-nhat-thong-so-kich-ban")
    public void putChiTietKichBan(@RequestBody List<ChiTietKichBan> requestList) {
        this.userServices.putChiTietKichBan(requestList);
    }

    //☺ xoa kich ban
    @DeleteMapping("/kich-ban/del-kich-ban/{id}")
    public void delKichBan(@PathVariable Long id) {
        this.userServices.delKichBan(id);
    }

    //☺ xoa thong so trong kich ban
    @DeleteMapping("/kich-ban/del-thong-so-kich-ban/{idChiTietKichBan}")
    public void delByIdChiTietKichBan(@PathVariable Long idChiTietKichBan) {
        this.userServices.delByIdChiTietKichBan(idChiTietKichBan);
    }

    //☺  xem chi tiet kich ban
    @GetMapping("/kich-ban/chi-tiet-kich-ban/{id}")
    public KichBan chiTietKichBan(@PathVariable Long id) {
        KichBan responseList = this.userServices.chiTietKichBan(id);
        return responseList;
    }

    //☺xem chi tiết kich ban theo ma kich ban
    @GetMapping("/kich-ban/chi-tiet-kich-ban-ma-kich-ban/{maKichban}")
    public KichBan getChiTietByMaKichBan(@PathVariable String maKichban) {
        KichBan responseList = this.userServices.chiTietKichBanByMaKichban(maKichban);
        return responseList;
    }

    //☺ xem thong tin kich ban
    @GetMapping("/kich-ban/{id}")
    public KichBan getKichBanById(@PathVariable Long id) {
        KichBan response = this.userServices.getKichBanById(id);
        return response;
    }

    //-------------------------------------------------- * -------------------------------------------------------------

    //---------------------------                San xuat hang ngay              ---------------------------------------

    // ☺ Hien thi danh sach san xuat hang ngay
    @GetMapping("/san-xuat-hang-ngay")
    public List<SanXuatHangNgay> getAllSanXuatHangNgay() {
        List<SanXuatHangNgay> responseList = this.userServices.getAllSanXuatHangNgay();
        return responseList;
    }

    //☺ Tim kiem noi dung san xuat hang ngay (ok)
    @PostMapping("/san-xuat-hang-ngay/tim-kiem")
    public List<SanXuatHangNgay> timKiemSanXuatHangNgay(@RequestBody SanXuatHangNgay request) {
        List<SanXuatHangNgay> responseList = this.userServices.timKiemSanxuatHangNgay(request);
        return responseList;
    }

    // ☺ them moi kich ban san xuat
    @PostMapping("/san-xuat-hang-ngay/them-moi-kich-ban")
    public String postSanXuatHangNgay(@RequestBody SanXuatHangNgay request) {
        String result = this.userServices.postSanXuatHangNgay(request);
        return result;
    }

    //☺Xem danh sach thong so san xuat hang ngay
    @GetMapping("/san-xuat-hang-ngay/chi-tiet-san-xuat/{id}")
    public List<ChiTietSanXuat> getAllsByIdKichBan(@PathVariable Long id) {
        List<ChiTietSanXuat> responseList = this.userServices.getAllsById(id);
        return responseList;
    }

    // ☺Chinh sua noi dung san xuat hang ngay (1)
    @PutMapping("/san-xuat-hang-ngay/cap-nhat")
    public void putChiTietSanXuat(@RequestBody List<ChiTietSanXuat> requestList) {
        this.userServices.putChiTietSanXuat(requestList);
    }

    // ?(1)xoa thong so trong noi dung san xuat hang ngay
    @DeleteMapping("/san-xuat-hang-ngay/del-thong-so/{idChiTietSanXuat}")
    public void delByIdChiTietSanXuat(@PathVariable Long idChiTietSanXuat) {
        this.userServices.delByIdChiTietSanXuat(idChiTietSanXuat);
    }

    // ☺xem chi tiet noi dung 1 kich ban san xuat hang ngay
    @GetMapping("/san-xuat-hang-ngay/chi-tiet/{id}")
    public SanXuatHangNgay chiTietSanXuat(@PathVariable Long id) {
        SanXuatHangNgay response = this.userServices.chiTietSanXuat(id);
        return response;
    }

    //☺ xem thong so san xuat hang ngay theo ma kich ban
    //☺ xem thông số kịch bản sản xuất theo san_xuat_hang_ngay_id
    @GetMapping("/chi-tiet-san-xuat/{sanXuatHangNgayId}")
    public List<ChiTietSanXuat> getChiTietSanXuatBySanXuatHangNgayId(@PathVariable Long sanXuatHangNgayId) {
        List<ChiTietSanXuat> responseList = this.userServices.getChiTietSanXuatBySanXuatHangNgayId(sanXuatHangNgayId);
        return responseList;
    }

    //☺Them moi thong tin thong so kich ban
    @PostMapping("/san-xuat-hang-ngay/them-moi-thong-so-san-xuat")
    public void postChiTietSanXuat(@RequestBody List<ChiTietSanXuat> requestList) {
        this.userServices.postChiTietSanXuat(requestList);
    }

    // ?(1)xoa thong so trong noi dung san xuat hang ngay
    //☺ xoa kich ban
    @DeleteMapping("/san-xuat-hang-ngay/del-kich-ban/{id}")
    public void delSanXuatHangNgay(@PathVariable Long id) {
        this.userServices.delSanXuatHangNgay(id);
    }

    @PutMapping("/san-xuat-hang-ngay/{id}")
    public void changeSignal(@PathVariable Long id, @RequestBody SanXuatHangNgay request) {
        this.userServices.changeSignal(id, request);
    }

    @PutMapping("/san-xuat-hang-ngay")
    public void changeSignal2(@RequestBody SanXuatHangNgay request) {
        this.userServices.changeSignal2(request);
    }

    //☺ tìm kiếm mã kịch bản sản xuất theo signal
    @GetMapping("/san-xuat-hang-ngay/{signal}")
    public List<SanXuatHangNgay> findAllBySignal(@PathVariable Long signal) {
        List<SanXuatHangNgay> responseList = this.userServices.findAllBySignal(signal);
        return responseList;
    }

    @GetMapping("/san-xuat-hang-ngay/ma-kich-ban/{maKichBan}")
    public SanXuatHangNgay getSXHNByMaKichBan(@PathVariable String maKichBan) {
        SanXuatHangNgay sanXuatHangNgay = this.userServices.getSXHNByMaKichBan(maKichBan);
        return sanXuatHangNgay;
    }

    //--------------------------- *  ----------------------------------------------------------------
    //------------------------------------------------ Nhóm thiết bị ---------------------------------------------------
    @GetMapping("/nhom-thiet-bi")
    public List<NhomThietBi> getAllNhomThietBi() {
        List<NhomThietBi> responseList = this.userServices.getAllNhomThietBi();
        return responseList;
    }

    //---------------------------------------------- *  ----------------------------------------------------------------
    //------------------------------------------------ Đơn vị ---------------------------------------------------
    @GetMapping("/don-vi")
    public List<DonVi> getAllDonVi() {
        List<DonVi> responseList = this.userServices.getAllDonVi();
        return responseList;
    }

    //---------------------------------------------- *  ----------------------------------------------------------------
    //------------------------------------------------ Day chuyen ---------------------------------------------------
    @GetMapping("day-chuyen")
    public List<DayChuyen> getAllDayChuyen() {
        List<DayChuyen> responseList = this.userServices.getAllDayChuyen();
        return responseList;
    }

    //---------------------------------------------- * -----------------------------------------------------------------
    @GetMapping("/kich-ban-change-status")
    public List<KichBanChangeStatus> findAllKBCS() {
        List<KichBanChangeStatus> responseList = this.userServices.findAllKBCS();
        return responseList;
    }

    @PutMapping("/kich-ban-change-status")
    public KichBanChangeStatus updateKBCS(@RequestBody KichBanChangeStatus request) {
        KichBanChangeStatus response = this.userServices.updateKBCS(request);
        return response;
    }

    @GetMapping("/lenh-san-xuat")
    public List<LenhSanXuat> getAllLenhSanXuat() {
        List<LenhSanXuat> responseList = this.userServices.getAllLenhSanXuat();
        return responseList;
    }

    @PostMapping("/lenh-san-xuat")
    public List<LenhSanXuat> timKiemLenhSanXuat(@RequestBody LenhSanXuat request) {
        List<LenhSanXuat> responseList = this.userServices.timKiemLenhSanXuat(request);
        return responseList;
    }

    @GetMapping("/quan-ly-phe-duyet")
    public List<LenhSanXuat> timKiemQuanLyPheDuyet() {
        List<LenhSanXuat> responseList = this.userServices.timKiemQuanLyPheDuyet();
        return responseList;
    }

    @GetMapping("/chi-tiet-lenh-san-xuat/{maLenhSanXuatId}")
    public List<ChiTietLenhSanXuat> chiTietLenhSanXuat(@PathVariable Long maLenhSanXuatId) {
        List<ChiTietLenhSanXuat> responseList = this.userServices.chiTietLenhSanXuat(maLenhSanXuatId);
        return responseList;
    }

    @PutMapping("/chi-tiet-lenh-san-xuat/{id}")
    public void updateTrangThaiLenhSanXuat(@PathVariable Long id, @RequestBody LenhSanXuat request) {
        this.userServices.updateTrangThaiLenhSanXuat(id, request);
    }

    @PutMapping("/chi-tiet-lenh-san-xuat/update/{id}")
    public void updateChiTietLenhSanXuat(@RequestBody List<ChiTietLenhSanXuat> request, @PathVariable Long id) {
        this.userServices.updateChiTietLenhSanXuat(request, id);
    }

    //☺API tìm kiếm
    @GetMapping("/lenhsx/ma-lenh-san-xuat")
    public List<String> getListMaLenhSanXuat() {
        return this.userServices.getListMaLenhSanXuat();
    }

    @GetMapping("/lenhsx/sap-code")
    public List<String> getListSapCode() {
        return this.userServices.getListSapCode();
    }

    @GetMapping("/lenhsx/sap-name")
    public List<String> getListSapName() {
        return this.userServices.getListSapName();
    }

    @GetMapping("/lenhsx/work-order-code")
    public List<String> getListWorkOrderCode() {
        return this.userServices.getListWorkOrderCode();
    }

    @GetMapping("/lenhsx/version")
    public List<String> getListVersion() {
        return this.userServices.getListVersion();
    }

    //--------------------------------------------- * -----------------------------------------
    //-------------------------------- Nhom san pham ---------------------------
    @GetMapping("/nhom-san-pham")
    public List<String> getAllNhomSanPham() {
        List<String> nhomSanPhams = this.userServices.getAllNhomSanPham();
        return nhomSanPhams;
    }
}
