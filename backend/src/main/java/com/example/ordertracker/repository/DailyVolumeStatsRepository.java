package com.example.ordertracker.repository;

import com.example.ordertracker.model.DailyVolumeStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface DailyVolumeStatsRepository extends JpaRepository<DailyVolumeStats, LocalDate> {
    Optional<DailyVolumeStats> findTopByOrderByDateDesc(); // To get the latest day's stats
}