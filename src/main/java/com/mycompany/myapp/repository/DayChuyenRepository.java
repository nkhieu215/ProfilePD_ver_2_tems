package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DayChuyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DayChuyenRepository extends JpaRepository<DayChuyen, Long> {}
