package longrun.flowwords.member;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Entity
@Builder
@AllArgsConstructor
@Table(name ="MEMBER")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true, length = 30)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNun;

}
