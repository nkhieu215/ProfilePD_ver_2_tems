package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ThietBi;
import java.time.ZonedDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ThietBi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThietBiRepository extends JpaRepository<ThietBi, Long> {
    //-------------------------------    Thiết bị -------------------------
    //☺ Tìm kiếm theo mã thiết bị
    @Query("select thiet_bi from ThietBi " + "thiet_bi  where thiet_bi.maThietBi like %:c%")
    public List<ThietBi> getByListMaThietBi(@Param("c") String maThietBi);

    //☺ sự kiện tìm kiếm
    @Query(
        "select thiet_bi from ThietBi thiet_bi where " +
        "thiet_bi.maThietBi like %:a% and thiet_bi.loaiThietBi like %:b% and thiet_bi.dayChuyen like %:c% and " +
        "thiet_bi.updateBy like %:f% and thiet_bi.status like %:g% " +
        "or thiet_bi.maThietBi like %:a% and thiet_bi.loaiThietBi like %:b% and thiet_bi.dayChuyen like %:c% and " +
        "thiet_bi.ngayTao >= :d and thiet_bi.updateBy like %:f% and thiet_bi.status like %:g% " +
        "or thiet_bi.maThietBi like %:a% and thiet_bi.loaiThietBi like %:b% and thiet_bi.dayChuyen like %:c% and " +
        "thiet_bi.timeUpdate >= :e and thiet_bi.updateBy like %:f% and thiet_bi.status like %:g% " +
        "or thiet_bi.maThietBi like %:a% and thiet_bi.loaiThietBi like %:b% and thiet_bi.dayChuyen like %:c% and " +
        "thiet_bi.ngayTao >= :d and thiet_bi.timeUpdate >= :e and thiet_bi.updateBy like %:f% and thiet_bi.status like %:g%"
    )
    public List<ThietBi> timKiemThietBi(
        @Param("a") String maThietBi,
        @Param("b") String loaiThietBi,
        @Param("c") String dayChuyen,
        @Param("d") ZonedDateTime ngayTao,
        @Param("e") ZonedDateTime timeUpdate,
        @Param("f") String updateBy,
        @Param("g") String status
    );

    @Query("SELECT DISTINCT o FROM ThietBi o " + " WHERE o.id =:c")
    public ThietBi getAllById(@Param("c") Long id);

    public ThietBi findAllByLoaiThietBi(String loaiThietBi);
}
