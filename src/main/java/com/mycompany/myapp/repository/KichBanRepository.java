package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.KichBan;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the KichBan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KichBanRepository extends JpaRepository<KichBan, Long> {
    //☺ Tim kiem kich ban
    @Query(
        "select kich_ban from KichBan kich_ban where " +
        "kich_ban.maKichBan like %:b% and kich_ban.maThietBi like %:c% and kich_ban.loaiThietBi like %:d% " +
        "and kich_ban.dayChuyen like %:e% and kich_ban.maSanPham like %:f% and kich_ban.versionSanPham like %:g% " +
        "and kich_ban.updateBy like %:k% and kich_ban.trangThai like %:m% " +
        "or kich_ban.maKichBan like %:b% and kich_ban.maThietBi like %:c% and kich_ban.loaiThietBi like %:d% " +
        "and kich_ban.dayChuyen like %:e% and kich_ban.maSanPham like %:f% and kich_ban.versionSanPham like %:g% " +
        "and kich_ban.ngayTao >= :h and kich_ban.updateBy like %:k% and kich_ban.trangThai like %:m% " +
        "or kich_ban.maKichBan like %:b% and kich_ban.maThietBi like %:c% and kich_ban.loaiThietBi like %:d% " +
        "and kich_ban.dayChuyen like %:e% and kich_ban.maSanPham like %:f% and kich_ban.versionSanPham like %:g% " +
        "and kich_ban.timeUpdate >= :i and kich_ban.updateBy like %:k% and kich_ban.trangThai like %:m% " +
        "or kich_ban.maKichBan like %:b% and kich_ban.maThietBi like %:c% and kich_ban.loaiThietBi like %:d% " +
        "and kich_ban.dayChuyen like %:e% and kich_ban.maSanPham like %:f% and kich_ban.versionSanPham like %:g% " +
        "and kich_ban.ngayTao >= :h and kich_ban.timeUpdate >= :i and kich_ban.updateBy like %:k% and kich_ban.trangThai like %:m%"
    )
    public List<KichBan> timKiemKichBan(
        @Param("b") String maKichBan,
        @Param("c") String maThietBi,
        @Param("d") String loaiThietBi,
        @Param("e") String dayChuyen,
        @Param("f") String maSanPham,
        @Param("g") String versionSanPham,
        @Param("h") ZonedDateTime ngayTao,
        @Param("i") ZonedDateTime timeUpdate,
        @Param("k") String updateBy,
        @Param("m") String trangThai
    );

    //☺ Tim kiem theo ma kich ban
    public KichBan findAllByMaKichBan(String maKichBan);

    @Query("SELECT DISTINCT o FROM KichBan o " + " WHERE o.id =:c")
    public KichBan getAllById(@Param("c") Long id);
}
