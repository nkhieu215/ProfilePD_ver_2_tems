package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.QuanLyThongSo;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the QuanLyThongSo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuanLyThongSoRepository extends JpaRepository<QuanLyThongSo, Long> {
    //----------------------- Template Quản lý thông số ----------------
    //☺ Tìm kiếm theo mã thông số
    public List<QuanLyThongSo> findAllByMaThongSo(String maThongSo);

    @Query("SELECT quan_ly_thong_so FROM QuanLyThongSo" + " quan_ly_thong_so WHERE quan_ly_thong_so.maThongSo = :m")
    public QuanLyThongSo getByMaThongSo(@Param("m") String maThongSo);

    //☺ Sự kiện tìm kiếm
    @Query(
        "select quan_ly_thong_so from QuanLyThongSo " +
        "quan_ly_thong_so where " +
        "quan_ly_thong_so.maThongSo like %:a% " +
        "and quan_ly_thong_so.tenThongSo like %:b% " +
        "and quan_ly_thong_so.updateBy like %:e% " +
        "and quan_ly_thong_so.status like %:f% or " +
        "quan_ly_thong_so.maThongSo like %:a% " +
        "and quan_ly_thong_so.tenThongSo like %:b% " +
        "and quan_ly_thong_so.ngayTao >= :c " +
        "and quan_ly_thong_so.updateBy like %:e% " +
        "and quan_ly_thong_so.status like %:f% or " +
        "quan_ly_thong_so.maThongSo like %:a% " +
        "and quan_ly_thong_so.tenThongSo like %:b% " +
        "and quan_ly_thong_so.ngayUpdate >= :d " +
        "and quan_ly_thong_so.updateBy like %:e% " +
        "and quan_ly_thong_so.status like %:f% or " +
        "quan_ly_thong_so.maThongSo like %:a% " +
        "and quan_ly_thong_so.tenThongSo like %:b% " +
        "and quan_ly_thong_so.ngayTao >= :c " +
        "and quan_ly_thong_so.ngayUpdate >= :d " +
        "and quan_ly_thong_so.updateBy like %:e% " +
        "and quan_ly_thong_so.status like %:f%"
    )
    public List<QuanLyThongSo> timKiemThongSo(
        @Param("a") String maThongSo,
        @Param("b") String tenThongSo,
        @Param("c") ZonedDateTime ngayTao,
        @Param("d") ZonedDateTime ngayUpdate,
        @Param("e") String updateBy,
        @Param("f") String status
    );
}
