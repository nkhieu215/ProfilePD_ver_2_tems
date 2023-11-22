package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ChiTietKichBan;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ChiTietKichBan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChiTietKichBanRepository extends JpaRepository<ChiTietKichBan, Long> {
    //☺Xem danh sach thong so kich ban
    public List<ChiTietKichBan> findAllByMaKichBan(String maKichBan);

    public List<ChiTietKichBan> findAllByKichBanId(Long id);

    @Query(value = "select * from chi_tiet_kich_ban ChiTietKichBan where kich_ban_id = ?1", nativeQuery = true)
    public List<ChiTietKichBan> getByKichBanId(Long kichBanId);

    //? xem danh sach thong so kịch bản theo mã kịch bản
    @Query(value = "select * from chi_tiet_kich_ban ChiTietKichBan where ma_kich_ban = ?1", nativeQuery = true)
    public List<ChiTietKichBan> getByMaKichBan(String maKichBan);

    @Modifying
    @Query(value = "update chi_tiet_kich_ban set kich_ban_id = ?1 where id = ?2", nativeQuery = true)
    public void updateIdKichBan(Long idKichBan, Long id);

    @Modifying
    @Query(
        value = "insert into chi_tiet_kich_ban (ma_kich_ban,hang_mkb,thong_so,min_value, " +
        "max_value, trungbinh, don_vi,phan_loai) values (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
        nativeQuery = true
    )
    public void insertChiTietKichBan(
        String maKichBan,
        Integer hangMkb,
        String thongSo,
        Float minValue,
        Float maxValue,
        Float trungBinh,
        String donVi,
        String phanLoai
    );
}
