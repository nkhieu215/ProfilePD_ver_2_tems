package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChiTietSanXuat;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChiTietSanXuat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChiTietSanXuatRepository extends JpaRepository<ChiTietSanXuat, Long> {
    //☺ Xem danh sach thong so san xuat hang ngay
    public List<ChiTietSanXuat> findAllByMaKichBan(String maKichban);

    @Modifying
    @Query(value = "update chi_tiet_san_xuat set san_xuat_hang_ngay_id = ?1 where id = ?2", nativeQuery = true)
    public void updateIdSanXuatHangNgay(Long idSXHN, Long id);

    public List<ChiTietSanXuat> findAllBySanXuatHangNgayId(Long id);

    //    @Query("select u from ChiTietSanXuat u where u.maKichBan = :c")
    //    public List<ChiTietSanXuat> getChiTietSanXuatByMaKichBan(@Param("c")String maKichBan);
    @Query(value = "select * from chi_tiet_san_xuat ChiTietSanXuat where ma_kich_ban = ?1", nativeQuery = true)
    public List<ChiTietSanXuat> getChiTietSanXuatByMaKichBan(String maKichBan);
}
