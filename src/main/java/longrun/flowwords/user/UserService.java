package longrun.flowwords.user;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UsersRepository usersRepository;

    public Users userSignup(Users users){
        validateDuplicateUser(users);
        return usersRepository.save(users);
    }

    private void validateDuplicateUser(Users user){
        if(usersRepository.findByEmail(user.getEmail()).isPresent()){
            throw new IllegalStateException("이미 가입된 회원입니다. ");
        }
    }


}
