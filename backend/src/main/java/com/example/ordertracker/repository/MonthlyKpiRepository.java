package com.example.ordertracker.repository;

import com.example.ordertracker.model.MonthlyKpi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.time.YearMonth;

@Repository
public interface MonthlyKpiRepository extends JpaRepository<MonthlyKpi, String> {
    List<MonthlyKpi> findByMonth(YearMonth month);
}