package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChiTietLenhSanXuat;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChiTietLenhSanXuat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChiTietLenhSanXuatRepository extends JpaRepository<ChiTietLenhSanXuat, Long> {
    @Query(value = "select * from chi_tiet_lenh_san_xuat ChiTietLenhSanXuat where " + "ma_lenh_san_xuat_id=?1", nativeQuery = true)
    public List<ChiTietLenhSanXuat> getAllByMaLenhSanXuatId(Long maLenhSanXuatId);

    @Modifying
    @Query(value = "update chi_tiet_lenh_san_xuat set ma_lenh_san_xuat_id = ?1 where id = ?2", nativeQuery = true)
    public void updateMaLenhSanXuatId(Long id, Long reelId);

    @Query(
        value = "select * from chi_tiet_lenh_san_xuat ChiTietLenhSanXuat where reel_id = ?1 and ma_lenh_san_xuat_id  IS NULL",
        nativeQuery = true
    )
    public ChiTietLenhSanXuat getChiTietLenhSanXuatItem(String reelID);
}
