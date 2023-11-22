package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.NhomSanPham;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NhomSanPhamRepository extends JpaRepository<NhomSanPham, Long> {
    @Query("SELECT DISTINCT e.nhomSanPham FROM NhomSanPham e")
    public List<String> getAllNhomSanPham();
}
