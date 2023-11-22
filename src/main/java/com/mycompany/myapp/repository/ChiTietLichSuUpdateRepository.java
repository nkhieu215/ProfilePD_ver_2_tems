package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChiTietLichSuUpdate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChiTietLichSuUpdate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChiTietLichSuUpdateRepository extends JpaRepository<ChiTietLichSuUpdate, Long> {
    @Modifying
    @Query(
        value = "update chi_tiet_lich_su_update ChiTietLichSuUpdate set lich_su_update_id = ?1 where ma_kich_ban = ?2",
        nativeQuery = true
    )
    public void updateIdChiTietLichSuUpdate(Long id, String maKichban);
}
