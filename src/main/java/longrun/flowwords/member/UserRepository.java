package longrun.flowwords.member;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    Optional<User> findByPhoneNum(String phoneNum);

    boolean existsByPhoneNum(String phoneNum);

    Optional<User> findByRefreshToken(String refreshToke);
}
