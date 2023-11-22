package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ThongSoMay;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ThongSoMay entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThongSoMayRepository extends JpaRepository<ThongSoMay, Long> {
    //----------------------- Chức năng thêm mới thiết bị -----------------------------------------------
    //☺ lấy dữ liệu theo tên thông số máy
    @Query("select thong_so_may from ThongSoMay " + "thong_so_may where thong_so_may.thongSo =:c")
    public ThongSoMay getByTenThongSoMay(@Param("c") String tenThongSo);

    //☺ tim kiem theo ma thiet bi
    @Query("select thong_so_may from ThongSoMay " + "thong_so_may where thong_so_may.maThietBi = :c")
    public List<ThongSoMay> getByMaThietBi(@Param("c") String maThietBi);

    //☺ Xem chi tiết thông số theo mã thiết bị và mã kịch bản

    public List<ThongSoMay> findAllByMaThietBi(String maThietBi);

    public List<ThongSoMay> findAllByLoaiThietBiAndMaThietBi(String loaiThietBi, String maThietBi);

    public List<ThongSoMay> findAllByLoaiThietBi(String request);

    public List<ThongSoMay> findAllByThietBiId(Long id);

    @Modifying
    @Query(value = "update thong_so_may set thiet_bi_id = ?1 where id = ?2", nativeQuery = true)
    public void updateIdThietBi(Long idThietBi, Long id);
}
