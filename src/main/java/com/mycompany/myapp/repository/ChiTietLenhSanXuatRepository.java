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
}
