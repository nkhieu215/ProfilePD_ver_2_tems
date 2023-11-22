package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SanXuatHangNgay;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the SanXuatHangNgay entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SanXuatHangNgayRepository extends JpaRepository<SanXuatHangNgay, Long> {
    //☺ tim kiem
    @Query(
        "select a from SanXuatHangNgay a where " +
        "a.maKichBan like %:b% and a.maThietBi like %:c% and a.loaiThietBi like %:d% " +
        "and a.dayChuyen like %:e% and a.maSanPham like %:f% and a.versionSanPham like %:g% " +
        "and a.trangThai like %:k% " +
        "or a.maKichBan like %:b% and a.maThietBi like %:c% and a.loaiThietBi like %:d% " +
        "and a.dayChuyen like %:e% and a.maSanPham like %:f% and a.versionSanPham like %:g% " +
        "and a.ngayTao >= :h and a.trangThai like %:k% " +
        "or a.maKichBan like %:b% and a.maThietBi like %:c% and a.loaiThietBi like %:d% " +
        "and a.dayChuyen like %:e% and a.maSanPham like %:f% and a.versionSanPham like %:g% " +
        "and a.timeUpdate >= :i and a.trangThai like %:k% " +
        "or a.maKichBan like %:b% and a.maThietBi like %:c% and a.loaiThietBi like %:d% " +
        "and a.dayChuyen like %:e% and a.maSanPham like %:f% and a.versionSanPham like %:g% " +
        "and a.ngayTao >= :h and a.timeUpdate >= :i and a.trangThai like %:k%"
    )
    public List<SanXuatHangNgay> timKiemSanXuatHangNgay(
        @Param("b") String maKichBan,
        @Param("c") String maThietBi,
        @Param("d") String loaiThietBi,
        @Param("e") String dayChuyen,
        @Param("f") String maSanPham,
        @Param("g") String versionSanPham,
        @Param("h") ZonedDateTime ngayTao,
        @Param("i") ZonedDateTime timeUpdate,
        @Param("k") String trangThai
    );

    public SanXuatHangNgay findAllByMaKichBan(String maKichBan);

    public SanXuatHangNgay findByMaKichBanAndSignal(String maKichBan, Long signal);

    public List<SanXuatHangNgay> findAllBySignal(Long signal);
}
