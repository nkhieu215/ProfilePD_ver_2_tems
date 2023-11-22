package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DonVi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonViRepository extends JpaRepository<DonVi, Long> {}
