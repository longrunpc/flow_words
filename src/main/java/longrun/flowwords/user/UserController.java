package longrun.flowwords.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    public static PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @GetMapping("/data")
    public String getUserName(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        // 인증된 사용자 정보에서 사용자 이름을 가져와서 반환합니다.
        if (userDetails != null) {
            return userDetails.getName();
        } else {
            return "Anonymous";
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Users user) {
        try {
            user.encodePassword(passwordEncoder());
            userService.userSignup(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
