package com.example.ordertracker.repository;

import com.example.ordertracker.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User user1;
    private User user2;

    @BeforeEach
    void setUp() {
        // Clear the database before each test
        userRepository.deleteAll();

        // Create and persist sample users
        user1 = new User();
        user1.setId("USER001");
        user1.setName("Charlie");
        user1.setEmail("charlie@example.com");
        user1.setJoinDate(LocalDate.now());
        user1.setTotalOrders(5);

        user2 = new User();
        user2.setId("USER002");
        user2.setName("David");
        user2.setEmail("david@example.com");
        user2.setJoinDate(LocalDate.now().minusDays(10));
        user2.setTotalOrders(1);

        entityManager.persist(user1);
        entityManager.persist(user2);
        entityManager.flush();
    }

    @Test
    void testFindAll() {
        List<User> users = userRepository.findAll();
        assertThat(users).hasSize(2);
        assertThat(users).containsExactlyInAnyOrder(user1, user2);
    }

    @Test
    void testFindById() {
        Optional<User> foundUser = userRepository.findById("USER001");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getName()).isEqualTo("Charlie");
    }

    @Test
    void testDeleteUser() {
        userRepository.deleteById("USER001");
        Optional<User> deletedUser = userRepository.findById("USER001");
        assertThat(deletedUser).isNotPresent();
    }

    @Test
    void testFindByEmail() {
        Optional<User> foundUser = userRepository.findByEmail("charlie@example.com");
        assertThat(foundUser).isPresent();
        assertThat(foundUser.get().getName()).isEqualTo("Charlie");

        Optional<User> notFoundUser = userRepository.findByEmail("nonexistent@example.com");
        assertThat(notFoundUser).isNotPresent();
    }

    @Test
    void testFindAllWhenNoUsersExist() {
        userRepository.deleteAll();
        List<User> users = userRepository.findAll();
        assertThat(users).isEmpty();
    }
}