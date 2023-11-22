package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.KichBanChangeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KichBanChangeStatusRepository extends JpaRepository<KichBanChangeStatus, Long> {
    public KichBanChangeStatus findByMaKichBan(String maKichBan);
}
