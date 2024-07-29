package longrun.flowwords.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UserController {

    @GetMapping("/data")
    public String getUserName(@AuthenticationPrincipal UserDetailsImpl user) {
        // 인증된 사용자 정보에서 사용자 이름을 가져와서 반환합니다.
        return "Hello, " + user.getUsername();
    }
}
